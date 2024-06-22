import Image from "next/image";


type Props = {
    question: string;
}


export const QuestionBubble = ({ question} : Props) =>{
    return (
        <div className="flex items-center gap-x-4 mb-6">
            <Image 
                src="/mascot.svg"
                alt="mascot"
                height={60}
                width={60}
                className="hidden lg:block"
            />

            <Image 
                src="/mascot.svg"
                alt="mascot"
                height={40}
                width={40}
                className="block lg:hidden"
            />
        </div>

    );
}