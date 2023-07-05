 
const ctx = document.getElementById('chartAtiv')
const chartOs = document.getElementById('chartOs')
const chartFin = document.getElementById('chartFin')
const chartPlanos = document.getElementById('chartPlanos')
const blackColor = '#000000'

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Conectado', 'desconectado'],
        datasets:[{
            data: [100, 23],
            borderWidth:1,
        }
    ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: blackColor
                }
            }
        }
        
    }
})
new Chart(chartFin, {
    type: 'doughnut',
    data: {
        labels: ['Recebido', 'A receber'],
        datasets:[{
            data: [30, 23],
            borderWidth:1,
        }
    ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: blackColor
                }
            }
        }
        
    }
})

new Chart(chartPlanos, {
    type: 'line',
    data: {
        labels: ['500MB', '250MB', '100MB'],
        datasets:[{
            data: [2, 5, 20],
            borderWidth:1,
        }
    ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: blackColor
                }
            }
        }
        
    }
})
new Chart(chartOs, {
    type: 'bar',
    data: {
        labels: ['Minhas', 'Encaminhadas'],
        datasets:[{
            data: [100, 23],
            borderWidth:1,
        }
    ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: blackColor
                }
            }
        }
        
    }
})
