import React, {useState} from 'react'
import styles from './Item.module.css'

interface Props {
  item: {
    id: string;
    name_en: string;
  };
  handleSelection: any;
}

const Item:  React.FC<Props> = ({item, handleSelection}) => {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <li className={styles.items} style={{ backgroundColor: selected ? '#23b94d' : '' }} id={item.id} onClick={(e) => { setSelected(prev => !prev); handleSelection(e) }}>
      {item.name_en}
    </li>
  )
}

export default Item;