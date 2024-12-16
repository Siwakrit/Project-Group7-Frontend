import { IoTrashOutline } from "react-icons/io5";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function MyCart({ name, category, image, price, onRemove }) {

    return (
        <div className="flex justify-center">
            <div className="flex justify-between w-[873px] h-[196px] p-[24px] bg-neutral-600 rounded-lg mb-8 hover:bg-neutral-800 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]">
                <div className="flex gap-5">
                    <div>
                        <img
                            className="w-[200px] h-[150px] object-cover rounded-lg transform transition-all duration-300 hover:scale-105"
                            src={image} alt={name} />
                    </div>
                    <div>
                        <p className="font-bold mb-3 text-xl">{name}</p>
                        <div className="flex flex-row gap-2">
                            {Array.isArray(category) && category.slice(0, 2).map((category, index) => (
                                <p key={index} className="bg-[#141313] rounded-full w-[120px] text-center py-1">{category}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <p className="font-semibold">THB {price}</p>
                    <button className="bg-red-500 border-2 font-bold hover:text-black hover:border-red-600 active:bg-red-700transform transition-all duration-300 text-white p-2 rounded-full flex gap-2 items-center justify-center w-[120px]" onClick={onRemove}>
                        <div className="pl-1">Remove</div>
                        <DotLottieReact src="https://lottie.host/9e5745c5-2bf3-4810-af49-e530c9c3665f/NGbkXFA3cc.lottie" playOnHover controls mode="bounce"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
