const paymentsFailureProcess = async () => {
  let redirectUrl = process.env.CUSTOMER_DEV_URL_FAILURE || process.env.CUSTOMER_DEPLOY_URL_FAILURE;
  return await `${redirectUrl}`
};

module.exports = { paymentsFailureProcess };
