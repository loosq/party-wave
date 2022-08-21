import React, {Component, ErrorInfo, PropsWithChildren} from 'react';
import bemCn from 'libs/bemCn';
import {Nullable} from 'types';

import './ErrorBoundary.scss';

type State = {
    error: Nullable<Error>;
    errorInfo: Nullable<ErrorInfo>;
}

const bemBlock = bemCn('error-boundary');

const HEADER = 'Ой, что-то пошло не так. Попробуйте обновить страницу';

export class ErrorBoundary extends Component<PropsWithChildren, State> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    // TODO привести компонент к дизайну
    render() {
        if (this.state.errorInfo && this.state.error) {
            return (
                <div className={bemBlock()}>
                    <h2 className={bemBlock('title')}>{HEADER}</h2>
                    <details>
                        <summary className={bemBlock('subtitle')}>
                            Подробнее
                        </summary>
                        <div className={bemBlock('error-description')}>
                            {String(this.state.error)}
                            <br />
                            <code className={bemBlock('code')}>
                                {this.state.errorInfo.componentStack}
                            </code>
                        </div>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
