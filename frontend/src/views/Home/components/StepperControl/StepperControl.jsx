import React from 'react';

const StepperControl = ({
  handleClick,
  handleConfirmBooking,
  currentStep,
  steps,
}) => {
  // Función para recargar la página
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* Verifica si el paso actual es 2 */}
      {currentStep === 2 ? (
        <button
          onClick={reloadPage} // Llama a la función para recargar la página
          className="bg-blue-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out"
        >
          Nueva búsqueda
        </button>
      ) : (
        <button
          onClick={() => handleClick()}
          className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
            currentStep === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          Atrás
        </button>
      )}

      {/* Verifica si el paso actual es el último */}
      {currentStep === steps.length ? (
        <button
          onClick={handleConfirmBooking} // Llama a la función para confirmar la reserva
          className="bg-sky-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
        >
          Confirmar
        </button>
      ) : (
        <button
          onClick={() => handleClick('siguiente')}
          className="bg-sky-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default StepperControl;
