/* eslint-disable react/prop-types */

export default function Player(props) {
    return (
        <form>
            <input className={props.isPlayerNameEmpty ? "empty-warning" : "player-name"}
                type="text"
                placeholder={props.formDefaultPlaceholder}
                name="playerName"
                value={props.formPlayerName}
                onChange={props.handleNameChange}
                maxLength={10}
            />
        </form>
    )
}