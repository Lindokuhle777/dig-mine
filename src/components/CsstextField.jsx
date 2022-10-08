import { alpha, styled } from '@mui/material/styles';
import{ TextField} from '@mui/material'
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#787a7c',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#787a7c',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#787a7c',
      },
      '&:hover fieldset': {
        borderColor: '#787a7c',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#787a7c',
      },
    },
  });

 export default CssTextField;