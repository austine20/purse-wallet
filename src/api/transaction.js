import { axiosInstance } from ".";

// verify account api fn
export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account-number",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// transfer funds fn

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// get all users transactions

export const GetAllTransactions = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/api/transactions/get-all-user-transactions"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
