import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'Connect Socials',
    },
    {
        label: 'Connect Gear',
    },
    {
        label: 'Launch',
    },
];

export default function VerticalLinearStepper({
    activeStep,
    setActiveStep,
}: {
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography>Last step</Typography>
                                ) : null
                            }
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: 'white', fontSize: '1.5rem' }}
                            >
                                {step.label}
                            </Typography>
                        </StepLabel>
                        <StepContent>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === steps.length - 1
                                        ? 'Finish'
                                        : 'Continue'}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography sx={{ color: 'white' }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}
