import React from 'react';
import { Formik, Form as FormikForm, ErrorMessage, useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { LoginValidation } from '../../validation/loginValidation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import dynamic from 'next/dynamic';
import useLoginHook from '../../hooks/AuthHooks/useLoginHook';
// import Googlelogin from './Googlelogin';
const Googlelogin = dynamic(() => import('./Googlelogin'), {
  ssr: false,
});
const LoginComponent = () => {
  // const { handleLanguageChange, multiLanguagesData }: any = useMultilangHook();
  const {
    passwordHidden,
    togglePasswordIcon,
    fetchToken,
    handleGetOtp,
    onKeydown,
    FormObserver,
    guestLogin,
    selectedMultiLangData,
    ShowAlertMsg,
    messageState,
  } = useLoginHook();
  // const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <>
      {/* <WebNavbar /> */}
      <div className="container">
        <div className="logo mt-3">
          <Link href="/" className="navbar-brand">
            <Image src="/assets/images/progearhub.png" alt="logo" width={200} height={55} />
          </Link>
        </div>
        <div>
          <Formik
            initialValues={{
              usr: '',
              pwd: '',
            }}
            validationSchema={LoginValidation}
            onSubmit={(values: any) => {
              console.log(values, 'bb');
              fetchToken(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className="login-form-wrapper">
                  <div className="mainFields-wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 logo-wrapper">
                          <h2 className="login_heading mt-3">{selectedMultiLangData?.login}</h2>
                          <Form.Group controlId="formName">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label color-black ">
                                  {selectedMultiLangData?.mobile_number} / {selectedMultiLangData?.email}:
                                </Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control onChange={handleChange} onBlur={handleBlur} type="text" name="usr" className="login_inputs" />
                                <div className="row">
                                  <div className="col-8">
                                    <div className="error_message">
                                      <ErrorMessage name="usr" />
                                    </div>
                                  </div>
                                  <div className="col-4 text-end">
                                    <Link className="linkss" href="#" onClick={(e) => handleGetOtp(e)}>
                                      {selectedMultiLangData?.get_otp}
                                    </Link>
                                  </div>
                                  {ShowAlertMsg && (
                                    <div className={`alert ${messageState === 'success' ? 'alert-success' : 'alert-danger'} otp_alertbox`} role="alert">
                                      {messageState === 'success'
                                        ? 'OTP send sucessfully on registered email'
                                        : 'Please enter valid mobile number or registered email'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="formPassword">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label color-black">{selectedMultiLangData?.password_otp}:</Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  // type="password"
                                  type={passwordHidden ? 'password' : 'text'}
                                  name="pwd"
                                  className="login_inputs  position-relative"
                                  onKeyDown={onKeydown}
                                />
                                <button className="password_icon" onClick={(e: React.MouseEvent) => togglePasswordIcon(e)}>
                                  {passwordHidden ? (
                                    // <i className="fas fa-eye"></i>
                                    <VisibilityOffIcon />
                                  ) : (
                                    // <i className="fas fa-eye-slash"></i>
                                    <VisibilityIcon />
                                  )}
                                </button>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="error_message">
                                      <ErrorMessage name="pwd" />
                                    </div>
                                  </div>
                                  <div className="col-6  login_forget_password_rtl">
                                    <Link className={`linkss`} href="/forgot-password">
                                      {selectedMultiLangData?.forgot_password} ?
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                          <div className={`mt-5 login_submitbtn`}>
                            <button type="submit" className={` btn button_color`}>
                              {selectedMultiLangData?.submit}
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-6 google_btn">
                          <div className="row">
                            <div className="col-12 text-lg-start text-center">
                              <div className="login-with-google mt-2">
                                {/* {typeof window !== 'undefined' && (
                                  <Googlelogin />
                                )} */}
                              </div>
                            </div>

                            <div className={`col-12 text-lg-start-login register_account`}>
                              <div className="register ms-2 account-margin not-acc-margin">
                                <span className="not_an_account">
                                  <span className="color-black">{selectedMultiLangData?.not_an_account}? </span>
                                  <Link className={`linkss`} href="/register">
                                    {selectedMultiLangData?.register}
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FormObserver />
              </FormikForm>
            )}
          </Formik>
        </div>
        <hr></hr>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default LoginComponent;
