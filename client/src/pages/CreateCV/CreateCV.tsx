
import React, { useState } from "react";
import TechStackSection from "../../components/TechStackSection/TechStackSection";
import AboutMeSection from "../../components/AboutMe/AboutMe";

const CreateCV: React.FC = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

  return (
<<<<<<< HEAD
    <div className="w-full">
        {step === 1 && <h1><AboutMe onSubmit={onSubmit}/></h1>}
        {step === 2 && <h1>Step 2</h1>}
=======
    <div>
        {step === 1 && <h1><AboutMeSection nextStep={nextStep} /></h1>}
        {step === 2 && <h1><TechStackSection nextStep={nextStep} prevStep={prevStep} /></h1>}
>>>>>>> 76660423f531970f2ec0087a4a03c3f635a156ce
        {step === 3 && <h1>Step 3</h1>}

    </div>
  )
}

export default CreateCV;