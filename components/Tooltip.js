import styles from "../styles/Tooltip.module.scss";

const Tooltip = ({key, character}) => {
    return (
        <div className={styles.tooltipopen}>{character.name},&nbsp;&nbsp;
        <div className={styles.tooltip}>
            <p>Name: {character.name}</p>
            <p>Birth year: {character.birth_year}</p>
            <p>Gender: {character.gender}</p>
            <p>Height: {character.height}cm</p>
            <p>Eye color: {character.eye_color}</p>
            <p>Hair color: {character.hair_color}</p>
            </div>
        </div>
    )
}

export default Tooltip;
