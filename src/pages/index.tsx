import styles from './index.less';
import { useIntl } from 'umi';
export default function IndexPage() {
  const lang = useIntl();
  return (
    <div>
      <h1 className={styles.title}>
        Page index {lang.formatMessage({ id: 'pageIndex.title' })}
      </h1>
    </div>
  );
}
