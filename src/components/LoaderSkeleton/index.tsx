import './styles.css';

export const LoaderSkeleton = () => {
    return (
        <section className='loader'>
            <ul className="o-vertical-spacing o-vertical-spacing--l">
                <li className="blog-post o-media">
                    <div className="o-media__body">
                        <div className="o-vertical-spacing">
                            <h3 className="blog-post__headline">
                                <span className="skeleton-box" style={{ width: "90%" }}></span>
                            </h3>
                            <p>
                                <span className="skeleton-box" style={{ width: "90%" }}></span>
                                <span className="skeleton-box" style={{ width: "90%" }}></span>
                                <span className="skeleton-box" style={{ width: "90%" }}></span>
                                <span className="skeleton-box" style={{ width: "90%" }}></span>
                            </p>
                            <div className="blog-post__meta">
                                <span className="skeleton-box" style={{ width: "50%" }}></span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    )
}