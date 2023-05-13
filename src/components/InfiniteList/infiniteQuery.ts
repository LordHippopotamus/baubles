import { QueryConstraint, startAfter } from 'firebase/firestore';
import { getDocs, getSnap, getDocsCount } from 'lib/firebase';
import { useEffect, useState } from 'react';

interface baseDoc {
  id: string;
}

export const useInfiniteQuery = <T extends baseDoc>(
  { path, options }: { path: [string, ...string[]]; options: QueryConstraint[] },
  initialData: T[] = []
): { loading: boolean; hasMore: boolean; data: T[]; fetchData: () => Promise<void> } => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [lastDocId, setLastDocId] = useState(initialData[initialData.length - 1].id);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (!hasMore) return;

    setLoading(true);
    const cursor = await getSnap([...path, lastDocId]);
    const docs = await getDocs<T>(path, [...options, startAfter(cursor)]);
    setData(prev => [...prev, ...docs]);
    setLastDocId(docs[docs.length - 1].id);
    setLoading(false);
  };

  const checkHasMore = async () => {
    const docsCount = await getDocsCount(path);
    setHasMore(docsCount > data.length);
  };

  useEffect(() => {
    checkHasMore();
  }, [data]);

  return { loading, hasMore, data, fetchData };
};
