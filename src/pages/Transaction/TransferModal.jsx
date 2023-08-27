import { Form, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { TransferFunds, VerifyAccount } from "../../api/transaction";

const TransferModal = (props) => {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    dispatch(ShowLoading());
    try {
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());

      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      dispatch(HideLoading());
      setIsVerified("false");
    }
  };

  const transferFunds = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference,
        status: "success",
      };

      const response = await TransferFunds(payload);

      if (response.success) {
        props.setShowModal(false);
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  console.log(Number(form.getFieldValue("amount")));
  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={props.showModal}
        onCancel={() => props.setShowModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={transferFunds}
          className="mt-2"
          form={form}
        >
          <div className="flex gap-2 items-center">
            <FormItem
              label="Account Number"
              name={"receiver"}
              className="w-100"
            >
              <input type="text" />
            </FormItem>

            <button
              type="button"
              className="primary-btn mt-md"
              onClick={verifyAccount}
            >
              Verify
            </button>
          </div>

          {isVerified === "true" && (
            <div className="bg-success">Account Verified Successfully</div>
          )}
          {isVerified === "false" && (
            <div className="bg-error">Account not Verified</div>
          )}

          <FormItem
            label="Amount"
            name={"amount"}
            rules={[
              {
                required: true,
                message: "amount required",
              },
              {
                max: user.balance,
                message: "insufficient balance",
              },
            ]}
          >
            <input type="text" />
          </FormItem>

          <FormItem label="Description" name={"reference"}>
            <textarea type="text"></textarea>
          </FormItem>

          <div className="flex justify-end gap-2">
            <button className="outline-btn">Cancel</button>

            {isVerified === "true" && (
              <button className="primary-btn">Transfer</button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TransferModal;
