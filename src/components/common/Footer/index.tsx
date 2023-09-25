import styles from "./styles.module.scss";
type Props = {}

const Header = (props: Props) => {
  return (
    <div className={styles.footer}>
        @2023 - <a href="https://www.linkedin.com/in/danilopiovani/">&nbsp;Danilo Piovani</a>
      </div>
  )
}

export default Header