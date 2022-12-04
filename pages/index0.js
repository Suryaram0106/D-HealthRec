import { useState, useEffect } from 'react'
import Router from 'next/router';
//import { nftContractAddress } from '../config.js'
import styles from '../styles/Signin.module.css'
import cx from "classnames";
//import { ethers } from 'ethers'
//import axios from 'axios'

const trade = () => {

	return (
		<div className={cx(styles["form-signin"],"text-center","mt-5")}>
			<div className={cx(styles.checkbox,"mb-3")}>
			</div>
			<h2 className={cx(styles.checkbox,"mb-4")}>
				e - Health Record 
			</h2>

			<div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
			</div>
			<h4 className={cx(styles.checkbox,"mb-3")}>
				Login as
			</h4>

			<div className={cx(styles.checkbox,"mb-3")}>    
        <button
				className="w-100 btn btn-lg btn-primary" type="button" onClick={() => Router.push('/signin')}>
        Scan Center Admin
        </button>
				</div>

			<div className={cx(styles.checkbox,"mb-3")}>    
			<button
				className="w-100 btn btn-lg btn-primary" type="button" onClick={() => Router.push('/signin')}>
        Patient
        </button>
			</div>

			<div className={cx(styles.checkbox,"mb-3")}>    
        <button
				className="w-100 btn btn-lg btn-primary" type="button" onClick={() => Router.push('/signin')}>
        Doctor
        </button>
				</div>

		</div>
	)

}
export default trade
