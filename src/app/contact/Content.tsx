import ContactbarContainer from "./ContactbarContainer";
import ContactForm from "./ContactForm";

const Content = () => {
  return (
    <div className="relative flex flex-col justify-start items-start w-full px-8">
      <ContactbarContainer />
      <span className="text-2xl sm:text-4xl w-full text-center mt-4">
        Send me a message
      </span>
      <p className="w-full text-center text-sm sm:text-lg mb-4">
        Fields marked with <span className="text-red-600 text-xl">*</span> are
        required
      </p>
      <ContactForm />
    </div>
  );
};

export default Content;
