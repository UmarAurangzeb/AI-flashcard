const Cancel: React.FC = () => {
  return (
    <div className="bg-cover w-screen h-screen flex justify-center items-center bg-slate-800 ">
      <div className="bg-slate-900 w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl ">
        <h1 className="pt-14 font-semibold text-3xl font-serif">
          Payment Canceled
        </h1>
        <p>Your payment was not successful. Please try again.</p>
      </div>
    </div>
  );
};

export default Cancel;
