import Palette from 'modules/Palette';
import Editor from 'modules/Editor';
import withUser from 'modules/Login/withUser';

const AddBauble = () => (
  <>
    <Editor />
    <Palette />
  </>
);

export default withUser(AddBauble);
