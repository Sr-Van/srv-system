const tableContas = document.querySelector(".receber-tb");
const modalConfirmPayment = document.querySelector(
  ".modal-confirm-payment-overlay"
);
const addPaymentBtn = document.querySelector(".btn-confirm");
const denyPaymentBtn = document.querySelector(".btn-deny");
const paymentTable = document.querySelector("#payments");

const receivedDash = document.querySelector(".received-payment");
const unreceivedDash = document.querySelector(".unreceived-payment");
const percentagePaymentDash = document.querySelector(".payment-percentage");
const percentagePaymentDashCircle = document.querySelector(".payment-svg");

const tableContasLoad = () => {
  let tableList;

  tableContas.innerHTML = "";
  clients.forEach((client, index) => {
    const { vencimento, nome, plano, pagamento } = client;
    getPaymentSituation(pagamento);
    const diaFormatted = vencimento <= 9 ? "0" + vencimento : vencimento;
    const mesFormatted = paymentMonth <= 9 ? "0" + paymentMonth : paymentMonth;
    const colorVenc =
      getColorPayment(pagamento) === "A receber"
        ? `style="color:#f31818";`
        : `style="color:#3ee60bb3";`;

    tableList = `
            <tr style="border-bottom: 1px solid var(--grey-color); background-color: var(--purple-light); height: 1.563rem; overflow: hidden;">
                <td>${nome}</td>
                <td>${plano}</td>
                <td>${diaFormatted}/${mesFormatted}</td>
                <td ${colorVenc}>${paymentSituation}</td>
                <td><a class="confirm-pag" data-id="${index}">Financeiro</a></td>
            </tr>
            `;
    tableContas.innerHTML += tableList;
  });
};

const getColorPayment = (pagamentos) => {
  const findActualMonth = pagamentos.find(
    (pagamento) => pagamento.month == mes
  );
  if (findActualMonth) {
    return findActualMonth.situation;
  }
  return "";
};

const getPaymentSituation = (pagamentos) => {
  fisrFindPayment = pagamentos.find(
    (pagamento) => pagamento.situation == "A receber"
  );

  if (fisrFindPayment == null) {
    fisrFindPayment = pagamentos.find(
      (pagamento) => pagamento.situation == "Recebido"
    );
  }
  const { month, situation } = fisrFindPayment;
  paymentMonth = month;
  paymentSituation = situation;
};

const renderPaymentTable = payment => {

  const { month, situation, value } = payment;

  const colorVenc =
    situation === "A receber"
      ? `style="color: var(--soft-red)";`
      : `style="color: var(--soft-green)";`;
  const tr = document.createElement("tr");
  tr.setAttribute("class", "tr-padrao-3");
  tr.innerHTML = `
      <td>Mes: ${month}</td>
      <td ${colorVenc}>${situation}</td>
      <td>Valor: ${value}</td>
      <td> <a class="select-td-payment" data-js="${month}">Selecionar</a></td>
      `;
  paymentTable.append(tr);
};


const renderClienteNameToPay = id => {
  const clientName = document.querySelector(".client-to-pay")
  const {nome} = clients[id]

  clientName.innerHTML = nome
}

const getPayment = (id) => {
  paymentTable.innerHTML = "";
  arrayPayment = clients[id].pagamento;
  arrayPayment.forEach(payment => renderPaymentTable(payment));

  renderClienteNameToPay(id)
};

const payManualMonth = (month) => {
  const monthToPay = arrayPayment.find((payment) => payment.month == month);
  monthToPay.situation = "Recebido";
  setDb();
};

const amountPercentage = (paid, totalAmount) => {
  const percentage = Math.trunc((paid * 100) / totalAmount);
  percentagePaymentDash.textContent = `${percentage}%`;

  if (percentage <= 51) {
    percentagePaymentDashCircle.style.stroke = "#f31818";
  } else {
    percentagePaymentDashCircle.style.stroke = "#038b79";
  }

  const percentageCircle = Math.trunc(
    Math.abs(((percentage - 100) / 100) * strokeDashToCircle)
  );
  percentagePaymentDashCircle.style.strokeDashoffset = percentageCircle;
};

const totalAmountDashboard = (paid, amount) => {
  totalAmount += amount;
  paidAmount += paid;


  amountPercentage(paidAmount, totalAmount);
};

const sumPaymentDashboard = (paid, unPaid) => {
  paidAmount += paid;
  unpaidAmount += unPaid;

  receivedDash.innerHTML = `$${paidAmount.toFixed(2)}`;
  unreceivedDash.innerHTML = `$${unpaidAmount.toFixed(2)}`;
};

const getPaymentAmount = (client) => {
  const arrPayment = client.pagamento;

  const unPaidAmount = arrPayment
    .filter(({ situation }) => situation == "A receber")
    .reduce((accumulator, { value }) => accumulator + parseFloat(value), 0);
  const PaidAmount = arrPayment
    .filter(({ situation }) => situation == "Recebido")
    .reduce((accumulator, { value }) => accumulator + parseFloat(value), 0);

  const totalAmount = arrPayment.reduce(
    (accumulator, { value }) => accumulator + parseFloat(value),
    0
  );

  totalAmountDashboard(PaidAmount, totalAmount);
  sumPaymentDashboard(PaidAmount, unPaidAmount);
};

const renderDashPayments = () => {
  paidAmount = 0;
  unpaidAmount = 0;
  totalAmount = 0;
  clients.forEach((client) => getPaymentAmount(client));
};

renderDashPayments();

paymentTable.addEventListener("click", (e) => {
  e.preventDefault();
  monthToConfirm = e.target.getAttribute("data-js");
});

denyPaymentBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modalConfirmPayment.style.display = "none";
  showAlert("acao cancelada");
});
addPaymentBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modalConfirmPayment.style.display = "none";
  payManualMonth(monthToConfirm);
  tableContasLoad();
  renderDashPayments();
  showAlert("Pagamento realizado");
});

tableContas.addEventListener("click", (e) => {
  e.preventDefault();
  idToConfirm = e.target.getAttribute("data-id");
  if (idToConfirm === null) {
    return;
  }
  modalConfirmPayment.style.display = "grid";
  getPayment(idToConfirm);
});
