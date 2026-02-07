import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>

            <Dropdown className="float-end me-2">
                <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark />Publish All
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem id="wd-publish-all">
                        <GreenCheckmark />Publish All
                    </DropdownItem>
                    
                    <DropdownItem id="wd-publish-all-modules-and-items"> 
                        <GreenCheckmark />Publish All Modules and Items
                    </DropdownItem>

                    <DropdownItem id="wd-publish-modules-only">
                        <GreenCheckmark />Publish Modules Only
                    </DropdownItem>
                    
                    <DropdownItem id="wd-unpublish-all-modules-and-items">
                        <GreenCheckmark />Unpublish All Modules and Items
                    </DropdownItem>

                    <DropdownItem id="wd-unpublish-modules-only">
                        <GreenCheckmark />Unpublish Modules Only
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-view-progress">
                View Progress
            </Button>

            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-collapse-all">
                Collapse All
            </Button>

        </div>
    );
}