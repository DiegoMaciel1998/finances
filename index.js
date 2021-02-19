const modal = {
    open() {
        //abre o modal
        //adiciona a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')

    },

    close() {
        //fechar o modal para remover a class active
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

//LocalStorage

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('nome')) || []
    },

    set(transactions) {
        localStorage.setItem('nome', JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),


    add(transaction) {
        Transaction.all.push(transaction)
        app.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        app.reload()
    },

    incomes() {
        let income = 0;

        //Pegar todas as transacoes
        //Para cada transacao
        Transaction.all.forEach(transaction => {
            //Se ela for maior que zero
            if (transaction.amount > 0) {
                //Somar a uma variavel e retornar a variavel
                income += transaction.amount;
            };

        })

        return income
    },

    expense() {
        let expense = 0;

        //Pegar todas as transacoes
        //Para cada transacao
        Transaction.all.forEach(transaction => {
            //Se ela for menor que zero
            if (transaction.amount < 0) {
                //Somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            };

        })

        return expense

    },

    total() {
        //entrada - saídas
        return Transaction.incomes() + Transaction.expense()

    }

}


const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    /*Transação*/
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction,index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = utils.formatCurrency(transaction.amount)

        const html =
            `<td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
            <td>
            `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = utils.formatCurrency(Transaction.expense())
        document.getElementById('totalDisplay').innerHTML = utils.formatCurrency(Transaction.total())

    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

/*Formatação dos dados*/
const utils = {
    formatAmount(value) {
        value = Number(value.replace(/\,\./g, '')) * 100
        
        return value
        
    },

    formatDate(date){
        const splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value
    }

    
    
}



const app = {
    init() {
        Transaction.all.forEach((transaction,index) => {
            DOM.addTransaction(transaction,index)
        })

        DOM.updateBalance()

        Storage.set(Transaction.all)


    },

    reload() {
        DOM.clearTransactions()
        app.init()
    }
}


app.init()


const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
            }
    },

    validateFields() {
        
        const {description,amount,date} = Form.getValues()

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error ('Por favor, preencha todos os campos')
        }
    },

    formatValues(){
        let { description, amount, date } = Form.getValues()
        
        amount = utils.formatAmount(amount)
        date = utils.formatDate(date)
        
        return {
            description,amount,date
        }
    
    },

    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ''
        Form.amount.value = ''
        Form.date.value = ''
    },

    submit(event) {
        event.preventDefault()
        


        try {
            //verificar campos validos
            Form.validateFields()        

            //pegar uma transação formatada
            const transaction = Form.formatValues()                     
            
            //Salvar
            Form.saveTransaction(transaction)                           
            
            //Apagar os dados do formulário
            Form.clearFields()                                        
            
            modal.close()                                              
        } catch (error) {
            alert(error.message)
        }
    }
}





