import React from "react";
import PropTypes from "prop-types";
import {
    Spinner,
    noop,
    Row,
    Col,
    Icon,
    ControlLabel
} from "patternfly-react";

export class AuditLogMonitor extends React.Component {
    componentDidUpdate () {
        // Set the textarea to be scrolled down to the bottom
        let textarea = document.getElementById('auditlog-area');
        textarea.scrollTop = textarea.scrollHeight;
    }

    componentDidMount() {
        this.props.enableTree();
    }

    render() {
        let spinner = "";
        if (this.props.reloading) {
            spinner =
                <div>
                    <Spinner inline loading size="sm" />
                    Reloading audit log...
                </div>;
        }
        let contRefreshCheckbox =
            <input type="checkbox" className="ds-sm-left-margin"
                onChange={this.props.handleRefresh}
            />;
        if (this.props.refreshing) {
            contRefreshCheckbox =
                <input type="checkbox" className="ds-sm-left-margin"
                    defaultChecked onChange={this.props.handleRefresh}
                />;
        }

        let selectLines =
            <div>
                <label htmlFor="auditlog-lines"> Log Lines To Show</label><select
                    className="btn btn-default dropdown ds-left-margin"
                    onChange={this.props.handleChange}
                    id="auditlog-lines" value={this.props.lines}>
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                    <option>300</option>
                    <option>400</option>
                    <option>500</option>
                    <option>1000</option>
                    <option>2000</option>
                    <option>5000</option>
                    <option>10000</option>
                    <option>50000</option>
                </select>
            </div>;

        return (
            <div id="monitor-log-audit-page">
                <Row>
                    <Col sm={4}>
                        <ControlLabel className="ds-suffix-header">
                            Audit Log
                            <Icon className="ds-left-margin ds-refresh"
                                type="fa" name="refresh" title="Refresh audit log"
                                onClick={() => this.props.reload(this.props.reload)}
                            />
                        </ControlLabel>
                    </Col>
                    <Col sm={8} className="ds-float-left">
                        {spinner}
                    </Col>
                </Row>
                <Row className="ds-margin-top-lg">
                    <Col sm={6}>
                        {selectLines}
                    </Col>
                    <Col sm={6}>
                        <div className="ds-float-right">
                            <label>
                                {contRefreshCheckbox} Continuously Refresh
                            </label>
                        </div>
                    </Col>
                </Row>
                <textarea id="auditlog-area" className="ds-logarea" value={this.props.data} readOnly />
            </div>
        );
    }
}

// Props and defaultProps

AuditLogMonitor.propTypes = {
    data: PropTypes.string,
    handleChange: PropTypes.func,
    handleRefresh: PropTypes.func,
    reload: PropTypes.func,
    reloading: PropTypes.bool,
    refreshing: PropTypes.bool,
    lines: PropTypes.string,
    enableTree: PropTypes.func,
};

AuditLogMonitor.defaultProps = {
    data: "",
    handleChange: noop,
    handleRefresh: noop,
    reload: noop,
    reloading: false,
    refreshing: false,
    line: "50",
    enableTree: noop,
};

export default AuditLogMonitor;
