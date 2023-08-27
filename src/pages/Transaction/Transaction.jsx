import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferModal from "./TransferModal";
import { GetAllTransactions } from "../../api/transaction";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import moment from "moment";
import { _formatCurrency } from "../../utils/Utils";

const Transaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const dispatch = useDispatch();

  const { user_Id } = useSelector((state) => state.users);

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        return _formatCurrency(record.amount);
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender === user_Id ? "Debit" : "Credit";
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return (
          <div
            className={
              record.status === "success" ? "status-success" : "status-error"
            }
          >
            {record.status}
          </div>
        );
      },
    },
  ];

  const getTransactions = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTransactions();
      if (response.success) {
        setTransactions(response.data);
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="transactions" />

        <div className="flex gap-1">
          <button className="text-lg outline-btn">Deposit</button>
          <button
            className="text-lg primary-btn"
            onClick={() => setShowModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="mt-3">
        <Table columns={columns} dataSource={transactions} />
      </div>

      {showModal && (
        <TransferModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Transaction;
