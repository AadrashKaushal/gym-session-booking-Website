import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export async function getStaticProps() {
    const res = await fetch('http://localhost/getActiveMembership')
    let information = await res.json()
    information = information.data;
    return { props: { information } }
}

export default function membership({ information }) {
    let [membershipPlan, setMembershipPlan] = useState(information[0].membershipName);

    let [payableAmount, setPayableAmount] = useState(information[0].amount);
    let [selectPlanValidity, setSelectPlanValidity] = useState(information[0].validity);

    const handlePlan = (e) => {

        setMembershipPlan(e.target.value);
        setPayableAmount(information[e.target.id].amount);
        setSelectPlanValidity(information[e.target.id].validity);
        
    }


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex ml-10 mr-10 mt-6 mb-10 justify-between ">
                    <div className=" w-[60rem] h-[33rem] border space-y-14">
                        <h1 className=" text-4xl font-semibold ml-14 mt-4">Complete Fitness Solutions</h1>
                        <RadioGroup defaultValue={information[0].membershipName} className="ml-14 space-y-8">
                            {
                                information.map((val, i) => {
                                    return (
                                        <>
                                            <div className="space-y-4">
                                                <div className=" flex justify-between mr-12">
                                                    <div className="flex items-center space-x-4">
                                                        <RadioGroupItem value={val.membershipName} id={i} onClick={handlePlan} className="w-5 h-5  text-green-600 border border-green-600" />
                                                        <Label htmlFor="r1" className="text-xl font-normal mt-[-0.2rem] border-b-2 pb-2 border-green-600">{val.membershipName}</Label>
                                                    </div>
                                                    <h1 className=" text-2xl text-green-600 font-semibold"> <CurrencyRupeeIcon className="mt-[-0.2rem]" />{val.amount} <span className="text-sm text-gray-400 font-normal">/{val.validity}</span></h1>
                                                </div>
                                                <h1 className=" ml-8">{val.description}</h1>
                                            </div>
                                            {
                                                i < information.length - 1 && <Separator className="border-gray-400 ml-[-1.5rem] " />
                                            }
                                        </>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                    <div className=" w-[28rem] h-[20rem] border">
                        <h1 className=" text-2xl font-semibold mt-4 ml-6 text-green-600">TRAMPFIT</h1>
                        <div className=" flex justify-between ml-6 mr-6 mt-2 mb-4">
                            <p className="font-normal">{selectPlanValidity} Membership</p>
                            <p className=" font-semibold"><CurrencyRupeeIcon className="text-sm mt-[-0.2rem]" />{payableAmount}</p>
                        </div>
                        <Separator className="border-gray-400 w-[25rem] ml-6 mr-6" />
                        <p className=" font-semibold ml-6 mr-3 mt-4">You have choosen TRAMPFIT <span>{membershipPlan}</span> with 7,500+ fitness center of a curated network</p>
                        <div className=" flex justify-between ml-6 mr-6 mt-8">
                            <p className=" text-lg text-green-600">Payable Amount</p>
                            <p className="font-bold"><CurrencyRupeeIcon className="text-sm mt-[-0.2rem]" />{payableAmount}</p>
                        </div>
                        <Button className="text-lg hover:bg-green-700 bg-green-600 w-[25rem] mb-5 mt-8 ml-6"> Pay <span><CurrencyRupeeIcon className="text-sm mt-[-0.2rem]" /></span>{payableAmount}</Button>
                    </div>
                </div>
                <div className=" border w-[60rem] h-60 ml-10 mb-10">
                    <h1 className=" text-xl  font-semibold ml-5 mt-4 mb-4">what is TRAMPFIT ?</h1>
                    <Separator className="border-gray-400" />
                    <p className=" mt-4 ml-5 text-md text-black font-normal">One Membership to workout</p>
                    <ul className=" list-disc ml-10 mt-2 text-md space-y-2">
                        <li>Across 7,500+ gyms and fitness studios pan-india</li>
                        <li>Access gyms and fitness studios anywhere , anytime-near your home, office or friends place</li>
                        <li>Unlimited workout reservations across all the network</li>
                    </ul>
                </div>
                <Footer />
            </div>
        </>
    );
}