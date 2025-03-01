import { useState } from "react";
import AboutMe from "../../components/AboutMe/AboutMe";
import TechStackSection from "../../components/TechStackSection/TechStackSection";
//

const CreateCV = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };


  return (
    <div>

        {step === 1 && <h1><AboutMeSection nextStep={nextStep} /></h1>}
        {step === 2 && <h1><TechStackSection nextStep={nextStep} prevStep={prevStep} /></h1>}

        {step === 3 && <h1>Step 3</h1>}

        <div className="mt-4">
            {step > 1 && <button className="mx-4 bg-red-500 rounded-2xl w-16 h-8 text-white" onClick={prevStep}>Back</button>}
            {step < 3 && <button className="mx-4 bg-red-500 rounded-2xl w-16 h-8 text-white" onClick={nextStep}>Next</button>} 
        </div>

    </div>
  )
}

export default CreateCV