import CloseIcon from '@mui/icons-material/Close';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import {
  Modal,
  Box,
  Fade,
  Typography,
  Divider,
  IconButton,
  Backdrop,
} from '@mui/material';

const HelpSupportModal = ({ open, close }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
     width: {
    xs: 300,
    sm: 400,
    md: 500,
  },
    bgcolor: 'background.paper',
    borderRadius: 2,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="flex justify-between items-center pb-2 px-4 py-4">
            <Typography id="transition-modal-title" variant="h6" component="h2">
                <div className="text-2xl font-bold">
              Help & Support
              </div>
            </Typography>
            <IconButton onClick={close} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div className="py-4 px-4">
            <p className="mb-1">
              For any queries or assistance, please contact us using the details below. Our support is available between <b>10:00 AM and 6:00 PM</b>.
            </p>
            <h5 className="text-center text-lg font-semibold py-2">MIS Support</h5>

            <div className="flex flex-col gap-2 md:gap-6 md:flex-row  items-center">
              <div className="bg-white py-2 px-3 text-md border border-[#ddd] rounded-md shadow-sm">
                <a href="tel:06811295560" className="flex items-center gap-2 text-gray-800">
                  <LocalPhoneIcon fontSize="small" /> 06811295560
                </a>
              </div>
              <div className="bg-white py-2 px-3 text-md border rounded-md border-[#ddd] shadow-sm">
                <a href="mailto:eo.nacganjam21@gmail.com" className="flex items-center gap-2 text-gray-800">
                  <EmailIcon fontSize="small" /> eo.nacganjam21@gmail.com
                </a>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default HelpSupportModal;
