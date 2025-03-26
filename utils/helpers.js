module.exports = {
  formatDate: (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  },

  calculateTotal: (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  generateResponse: (status, message, data = null) => {
    return {
      status,
      message,
      data,
    };
  },
};