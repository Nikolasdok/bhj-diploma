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
    this.renderAccountsList();
    this.element = element;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = this.element.querySelector("select.accounts-select");
    accountList.innerHTML = "";
    const data = User.current();
    Account.list(data, (err, response) => {
      if(response.success) {
        response.data.forEach(accObj => accountList.insertAdjacentHTML("beforeend", 
        `<option value="${accObj.id}">${accObj.name}</option>`))
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
   onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        if (data.type === "expense") {
            App.getModal("newExpense").close();
        }
        else if (data.type === "income")
        App.getModal("newIncome").close();
        this.element.reset();
        App.update();
      }
    });
  }
}