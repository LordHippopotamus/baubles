import { Palette, Editor, withUser } from 'components';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useBaubles, useEditorStore } from 'hooks';

const EditorRoute = () => {
  const { getBauble } = useBaubles();

  const [params] = useSearchParams();
  const baubleOwner = params.get('owner');
  const baubleId = params.get('bauble');

  const { data: bauble } = useQuery(
    ['baubles', { user: baubleOwner, id: baubleId }],
    () => getBauble(baubleOwner, baubleId),
    {
      onSuccess: ({ area }) => useEditorStore.setState({ area }),
    }
  );

  return (
    <>
      <Editor />
      <Palette />
    </>
  );
};

export default withUser(EditorRoute, {
  requireAuthorization: true,
  shouldWaitAuthorization: true,
  shouldCheckPermissions: true,
  useOwnerId: () => {
    const [params] = useSearchParams();
    return params.get('owner');
  },
});
