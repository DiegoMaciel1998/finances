const modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')

    },

    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Transaction = {
    description() {

    },

    expense(){

    },

    income(){

    }

}

const transactions = [
    {
        description: 'Luz',
        amount: 50000,
        date: '21/01/2021'
    },
    
    {
        description: 'Luz',
        amount: 50000000,
        date: '01/01/2021'
    },

    {
        description: 'Luz',
        amount: 21330000,
        date: '30/01/2021'
    }
    ,
    {
        description: 'App',
        amount: 250000,
        date: '04/04/2021'
    }
]


const DOM = {
    transactionsContainer : document.querySelector('#data-table tbody'),
    

    addTransaction(transaction,index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
        
        
        
        
    }
    ,
    innerHTMLTransaction(transaction){
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
        
        
        `

        return html
    }
}


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

