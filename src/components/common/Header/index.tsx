import Image from 'next/image';
import styles from "./styles.module.scss";
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className={styles.logoWrapper}>
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        <h1>Address Lookup</h1>
    </div>
  )
}

export default Footer