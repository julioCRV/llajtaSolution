import React, { useState } from 'react';
import { Button, Modal, message, Space,notification } from 'antd';
import {DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons'
import '../styles/stileModalConfirmation.css'

export const ModalConfirmation = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('¿Esta seguro de eliminar el platillo tradicional?');
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
      setOpen(true);
    };
    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
    };
    const handleOk = () => {
      setModalText('Eliminando platillo... ');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      mostrarNotificacionExito();
      
    };
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
    const mostrarNotificacionExito = () => {
      notification.success({
        message: 'Eliminación Exitosa',
        description: 'El elemento ha sido eliminado correctamente.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        className: 'custom-notification',
        duration:4,
      });
    };
    

  return (
    <>
      <Button type="primary" onClick={showModal} danger>
        <DeleteOutlined />
      </Button>
      <Modal

        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancelar</Button>,
          <Button onClick={handleOk} danger >Eliminar</Button>
        ]}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

