import { Palette, Editor, withUser } from 'components';
import { useSearchParams } from 'react-router-dom';

const EditorRoute = () => (
  <>
    <Editor />
    <Palette />
  </>
);

export default withUser(EditorRoute, {
  requireAuthorization: true,
  shouldWaitAuthorization: true,
  shouldCheckPermissions: true,
  useOwnerId: () => {
    const [params] = useSearchParams();
    const uid = params.get('owner');
    return uid;
  },
});
