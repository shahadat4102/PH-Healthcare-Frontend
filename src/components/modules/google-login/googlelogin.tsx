import { toast } from "@/components/ui/toast";
import { GoogleLogin } from "@react-oauth/google";
import {useGoogleAuth} from "@/hooks"
import { useRouter } from "next/navigation";

export default function GoogleLoginComponet() {
     const router = useRouter();
      const {mutate: googleLogin} = useGoogleAuth()

          const handelGoogleSuccess = (credentialResponse: {credential?: string;}) => {
      const idToken = credentialResponse.credential; 

       if(!idToken){
        toast.add({
        title: "Google Outh Failed",
        description: "something went wrong. Please again",
        type: "error"
       });
       return
      }
      googleLogin({idToken}, {
        onSuccess : () => {
         toast.add({
         title: "Logged in Successfully",
         description: "welcome back",
         type: "success"
       })
      router.push("/")
      },

      onError: (err) => {
         toast.add({
        title: "Google Outh Failed",
        description: err.message || "something went wrong. Please again",
        type: "error"
       });
      }

      })
    };

     const handelGoogleError = () => {
         toast.add({
        title: "Google Outh Failed",
        description: "something went wrong. Please again",
        type: "error"
       })
    }

    return (

         <GoogleLogin 
            theme="outline"
            shape="pill"
            text="continue_with"
             onSuccess={handelGoogleSuccess}
             onError={handelGoogleError} 

              />
    )
}