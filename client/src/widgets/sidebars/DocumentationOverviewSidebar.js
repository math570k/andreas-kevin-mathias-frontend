import React, { useEffect } from "react";
import { useOrganization } from "../../services/providers/OrganizationProvider";
import Sidebar from "../../ui/layout/Sidebar";
import {useGetPageSections} from "../../graphql/section";
import Folder from "../../ui/icons/Folder"

export default function DocumentationOverview() {
    const { activeOrganization, setActiveProject } = useOrganization();
    const [loadSections, {called, loading, data}] = useGetPageSections();

    return (
        <Sidebar>
            <ul>
                {activeOrganization && activeOrganization.projects.length > 0 ? 
                    activeOrganization.projects.map((project) => (
                        <li className={'px-8 py-6 border-b border-primary-500 w-100'} key={project.id}>
                            <div className={'folder flex items-center'}>
                                <Folder color={project.color} />
                                <h2 className="ml-4">
                                    {project.title}
                                </h2>
                            </div>

                            <ul className="pages pl-4 mt-4">
                            {project.pages.length > 0 && project.pages.map((page) => {
                                return(
                                    <li className="relative mb-3" key={page.id} onClick={() => setActiveProject(project)}>
                                        <h3 className="pages-item-title text-gray cursor-pointer">{ page.title }</h3>
                                    </li>
                                ) 
                            })}
                            </ul>
                        </li>
                    ))
                : <h3 className="p-8">No projects yet</h3>}
            </ul>
            <div className="p-8">
                <button className={"button-blue"}>Create project +</button>
            </div>
        </Sidebar>
    )
}