'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import *as Yup from 'yup'

export default function Register () {

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, 'Username Must be 6 Characters')
            .required('Username is Required')
        , 
        email: Yup.string()
            .email('Invalid Email Address')
            .required('Email is Required')
        , 
        password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
    })
   
    const {mutate} = useMutation({
        mutationFn: async({username, email, password, referredBy}) => {
            await axios.post('http://localhost:8000/organizer/register', {
                email, username, password, referredBy
            }) 
        },
        onSuccess: () => {
           alert('Success')
        },
        onError: (error) => {
            console.log(error)
            alert('Error')
            
            
        }
    })
    
    return(
        
        <section className="bg-gray-50 dark:bg-gray-900 py-[7rem]">
            <Formik
                initialValues={{username: '', email: '', password: '', referredBy: ''}}
                validationSchema={registerSchema}
                onSubmit={async(values) => {
                    const {username, email, password, role, referredBy} = values 
                    await mutate({username, email, password, role, referredBy})
                }}
            >
   
    <Form>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">        
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register Organizer
              </h1>
              <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <Field
                            name="username"
                            type="text"
                        >{({field}) => (
                            <input {...field} 
                                placeholder="Type Username" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        )}
                        </Field>
                        <ErrorMessage 
                            name="username"
                        />
                      {/* <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nama123" required=""/> */}
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <Field
                            name="email"
                            type="text"
                        >{({field}) => (
                            <input {...field} 
                                placeholder="name@gmail.com" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        )}
                        </Field>
                        <ErrorMessage 
                            name="email"
                        />
                      {/* <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/> */}
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <Field
                            name="password"
                            type="password"
                        >{({field}) => (
                            <input {...field} 
                                type = 'password'
                                placeholder="*******" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        )}
                        </Field>
                        <ErrorMessage 
                            name="password"
                        />
                      {/* <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/> */}
                  </div>
                  <div>
                      <label for="referalcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Referred By</label>
                      <Field
                            name="referredBy"
                            type="text"
                        >{({field}) => (
                            <input {...field} 
                                placeholder="Type Referal Code" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        )}
                        </Field>
                        <ErrorMessage 
                            name="referredby"
                        />
                      {/* <input type="referalcode" name="referalcode" id="referalcode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Referral Code" required=""/> */}
                  </div>
                  <div className="flex items-start">
                      {/* <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div> */}
                  </div>
                  <button type="submit" className="w-full bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="./Login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
    </Form>
  </Formik>
</section>

    )
}