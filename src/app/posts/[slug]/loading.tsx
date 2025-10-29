import page from './page.module.css';
import style from './loading.module.css';

export default function Loading() {
    return (
        <>
            <article id="main-content" className={page.article}>
                <header className={page.header}>
                    <div className={page.meta}>
                        <div className={`${style.bar} ${style.dateBar} ${style.shimmer}`} />                        
                        
                        <div className={`${style.pill} ${style.categoryPill} ${style.shimmer}`} />
                    </div>
                    
                    <div className={`${style.bar} ${style.titleBar} ${style.shimmer}`} />
                </header>
                
                <div className={page.content}>                                        
                    <div className={`${style.block} ${style.imageBox} ${style.shimmer}`} />                    
                    
                    <div className={`${style.block} ${style.blockquoteBox} ${style.shimmer}`} />                    
                </div>
            </article>            
        </>
    )
}