/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    document.querySelectorAll('option').forEach(element => {
      element.remove();
    })

    if(this.element.id === 'new-income-form') {
      const selectIncome = document.getElementById('income-accounts-list');
      Account.list(null, (err, resp) => {
        if(resp && resp.success) {
          resp.data.forEach(element => {
            selectIncome.insertAdjacentHTML('beforeend', `<option value="${element.id}">${element.name}</option>`);
          })
        }
      })

    } else if(this.element.id === 'new-expense-form') {
      const selectExpense = document.getElementById('expense-accounts-list');
      Account.list(null, (err, resp) => {
        if(resp && resp.success) {
          resp.data.forEach(element => {
            selectExpense.insertAdjacentHTML('beforeend', `<option value="${element.id}">${element.name}</option>`);
          })
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if(resp && resp.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        this.element.reset();
        App.update();
      }
    });
  }
}
