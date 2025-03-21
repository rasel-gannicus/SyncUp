"use client" ;
import { useParams } from "next/navigation";
import AuthenticationContainer from "./_container/AuthenticationContainer";

export default function Page() {
    const params = useParams() ; 
    const {slug} = params ;
    return (
        <div>
            <AuthenticationContainer />
        </div>
    );
}