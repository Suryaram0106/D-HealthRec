import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import cx from "classnames";
import styles from '../styles/Signin.module.css'
//import SocialLogin from "@biconomy/web3-auth";

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    /*// init wallet
    const socialLoginSDK = new SocialLogin();
    await socialLoginSDK.init(chain.id); // Enter the network id in hex) parameter
    socialLoginSDK.showConnectModal();
    // show connect modal
    socialLoginSDK.showWallet();

    if (!socialLoginSDK?.web3auth?.provider) return;
    const provider = new ethers.providers.Web3Provider(
    socialLoginSDK.web3auth.provider,
    );
    const accounts = await provider.listAccounts();
    console.log("EOA address", accounts)*/


    const handleAuth = async (wal) => {
        if (isConnected) {
            await disconnectAsync();
        }


        const userData = { network: "evm" };


        if(wal=="meta"){

          const { account, chain } = await connectAsync({ connector: new MetaMaskConnector({}), });
          userData.address = account;
          userData.chain=chain.id;
        }

        if(wal=="wallet"){

          const { account, chain } = await connectAsync({ connector: new WalletConnectConnector({options:{qrcode:true}}), });
          userData.address = account;
          userData.chain=chain.id;
        }

        if(wal=="coin"){

          const { account, chain } = await connectAsync({ connector: new CoinbaseWalletConnector({}), });
          userData.address = account;
          userData.chain=chain.id;
        }
        

        const { data } = await axios.post("/api/auth/request-message", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const message = data.message;

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn("credentials", { message, signature, redirect: false, callbackUrl: "/index.html" });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (


      
        <div className={cx(styles["form-signin"],"text-center","mt-5")}>


        

        <h1 className="h3 mb-3 fw-normal">SIGN IN</h1>
            
        <div className={cx(styles.checkbox,"mb-3")}>
            <button className="w-100 btn btn-lg btn-primary" onClick={() => handleAuth("meta")}>Metamask</button>
        </div>    

        <div className={cx(styles.checkbox,"mb-3")}>    
            <button className="w-100 btn btn-lg btn-primary" onClick={() => handleAuth("wallet")}>WalletConnect</button>
        </div>

        <div className={cx(styles.checkbox,"mb-3")}>   
            <button className="w-100 btn btn-lg btn-primary" onClick={() => handleAuth("coin")}>CoinBase Wallet</button>
        </div>    

        </div>

    

      
       
    );
}

export default SignIn;