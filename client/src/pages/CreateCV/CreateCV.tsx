import { useState } from "react";
import AboutMe from "../../components/AboutMe/AboutMe";

const CreateCV = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }


  return (
    <div>
        {step === 1 && <h1><AboutMe/></h1>}
        {step === 2 && <h1>Step 2</h1>}
        {step === 3 && <h1>Step 3</h1>}

        <div className="mt-4">
            {step > 1 && <button className="mx-4 bg-red-500 rounded-2xl w-16 h-8 text-white" onClick={prevStep}>Back</button>}
            {step < 3 && <button className="mx-4 bg-red-500 rounded-2xl w-16 h-8 text-white" onClick={nextStep}>Next</button>} 
        </div>

    </div>
  )
}

export default CreateCV