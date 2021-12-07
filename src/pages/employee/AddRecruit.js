/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container, Typography, Box, Button, Stepper, Step, StepLabel, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Page from '../../components/Page';
import BasicInfor from './BasicInfor';
import PersonalInfor from './PersonalInfor';
import Utilities from './Utilities';
import { getRecruitmentByID } from '../../functions/Employee';
import axios from '../../functions/Axios';

const steps = ['Basic Information', 'Personal Information', 'Utilities'];
export default function AddRecruit() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [skipped, setSkipped] = useState(new Set());
  useEffect(() => {
    getRecruitmentByID(id).then((res) => {
      setIsLoaded(true);
      // set all res to formik
      formik.setFieldValue('FullName', res.FullName);
      formik.setFieldValue('Birthday', res.Birthday);
      formik.setFieldValue('Gender', res.Gender);
      formik.setFieldValue('Image', res.Image);
      formik.setFieldValue('PlaceOfBirth', res.PlaceOfBirth);
      formik.setFieldValue('Address', res.Address);
      formik.setFieldValue('TemporaryAddress', res.TemporaryAddress);
      formik.setFieldValue('Email', res.Email);
      formik.setFieldValue('Phone', res.Phone);
      formik.setFieldValue('IdentityCard', res.IdentityCard);
      formik.setFieldValue('DateRange', res.DateRange);
      formik.setFieldValue('IssuedBy', res.IssuedBy);
      formik.setFieldValue('StartDate', res.StartDate);
      formik.setFieldValue('Health', res.Health);
      formik.setFieldValue('SocialInsurance', res.SocialInsurance);
      formik.setFieldValue('HealthInsurance', res.HealthInsurance);
      formik.setFieldValue('UnemploymentInsurance', res.UnemploymentInsurance);
      formik.setFieldValue('CreatedBy', res.CreatedBy);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      step: 0,
      FullName: '',
      NickName: '',
      Gender: '',
      Image: '',
      PlaceOfBirth: '',
      Address: '',
      TemporaryAddress: '',
      Email: '',
      Phone: '',
      IdentityCard: '',
      DateRange: '',
      IssuedBy: '',
      StartDate: '',
      Health: '',
      SocialInsurance: '',
      HealthInsurance: '',
      UnemploymentInsurance: '',
      CreatedBy: ''
    },
    onSubmit: () => {
      console.log(formik.values);
    }
  });
  const handleChange = (input) => (e) => {
    formik.setFieldValue({ [input]: e.target.value });
  };
  const {
    FullName,
    NickName,
    Gender,
    Image,
    PlaceOfBirth,
    Address,
    TemporaryAddress,
    Email,
    Phone,
    IdentityCard,
    DateRange,
    IssuedBy,
    StartDate,
    Health,
    SocialInsurance,
    HealthInsurance,
    UnemploymentInsurance,
    CreatedBy
  } = formik.values;
  const values = {
    FullName,
    NickName,
    Gender,
    Image,
    PlaceOfBirth,
    Address,
    TemporaryAddress,
    Email,
    Phone,
    IdentityCard,
    DateRange,
    IssuedBy,
    StartDate,
    Health,
    SocialInsurance,
    HealthInsurance,
    UnemploymentInsurance,
    CreatedBy
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicInfor handleChange={handleChange} values={values} onHandleNext={handleNext} />;
      case 1:
        return (
          <PersonalInfor handleChange={handleChange} values={values} onHandleNext={handleNext} />
        );
      case 2:
        return <Utilities />;
      default:
        return 'unknown step';
    }
  }
  const isStepOptional = (step) => step === null;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Page title="Add Recruit">
      <Container maxWidth="md">
        <Box mt={2}>
          <Typography variant="h4" gutterBottom>
            Add Recruit
          </Typography>
        </Box>
        <Box mt={2}>
          <FormikProvider value={formik}>
            <Form>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Box mt={2}>
                <Box>
                  {getStepContent(activeStep)}
                  <Box mt={2}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button variant="contained" color="primary" onClick={handleSkip}>
                        Skip
                      </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Page>
  );
}
