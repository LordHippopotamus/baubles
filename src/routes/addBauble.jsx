import { Palette, Editor, withUser } from 'components';

const AddBauble = () => (
  <>
    <Editor />
    <Palette />
  </>
);

export default withUser(AddBauble);
