import React, { useState } from 'react';
import styles from './CircleColor.module.css';
interface CopyButtonProps {
  color: string;
}

export default function CopyButton({ color }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    // @ts-ignore
    <button onClick={handleCopy} className={styles.colorCircle} style={{"--color": color, "--radius": "18px"}}>
        <div className={styles.tooltip}>
            {copied ? <span>Copied!</span> : <span>{color}</span>}
            <div className={styles.arrow}></div>
        </div>
    </button>
  );
}