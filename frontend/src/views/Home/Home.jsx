import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/index.js';
import { Stepper, StepperControl } from './components/index.js';
import { Step1, Step2, Step3 } from './Steps/index.js';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardDetails, setCreditCardDetails] = useState(null);
  const [step1Data, setStep1Data] = useState({
    transferOffers: [],
    startLocationCode: '',
    transferType: '',
    startDateTime: '',
    endAddressLine: '',
    endGeoCode: '',
    endCountryCode: '',
  });
  const steps = ['Reserva', 'Método de Pago', 'Confirmación'];
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;
      setUserInfo(user);
    };

    fetchUserInfo();
  }, []);

  const notify = () =>
    toast.success('Tu traslado fue reservado con éxito!', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: 'Bounce',
      className: 'visibility-toast',
    });

  const handleConfirmBooking = async () => {
    try {
      const userId = userInfo ? userInfo._id : null;
      const bookingData = {
        user_id: userId,
        offer_id: selectedOffer.id,
        offer: JSON.stringify(selectedOffer),
      };

      await axios.post(
        'https://travelandz-backend.onrender.com/api/booking/reserve',
        bookingData
      );

      notify();

      setTimeout(() => {
        window.location.replace(
          'https://travelandztest.netlify.app/my-bookings'
        );
      }, 2000);
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
    }
  };

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleSelectPayment = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  const handleCreditCardDetails = (details) => {
    setCreditCardDetails(details);
  };

  const handleStep1Data = (data) => {
    setStep1Data((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNext={() => setCurrentStep(2)}
            onSelectOffer={handleSelectOffer}
            {...step1Data}
            onSaveStep1Data={handleStep1Data}
          />
        );
      case 2:
        return (
          <Step2
            onNext={() => setCurrentStep(3)}
            onSelectPayment={handleSelectPayment}
            onCreditCardDetails={handleCreditCardDetails}
          />
        );
      case 3:
        return (
          <Step3
            selectedOffer={selectedOffer}
            paymentMethod={paymentMethod}
            creditCardDetails={creditCardDetails}
          />
        );
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === 'siguiente' ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="body">
      <nav>
        <Nav />
      </nav>
      <div className="container">
        <div className="container horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="my-10 py-10">{displaySteps(currentStep)}</div>
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          handleConfirmBooking={handleConfirmBooking}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home;
