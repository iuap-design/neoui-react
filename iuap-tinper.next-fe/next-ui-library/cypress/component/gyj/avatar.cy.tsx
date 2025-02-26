import React from "react";
import Avatar from "../../../../packages/wui-avatar/src";
import Icon from "../../../../packages/wui-icon/src";

describe("avatar.cy.tsx", () => {
    it("test avatar <size shape gap>", () => {
        cy.mount(
            <div>
                <Avatar />
                <Avatar size="large" />
                <Avatar size="small" />
                <Avatar shape="square" />
                <Avatar>Bobo</Avatar>
                <Avatar gap={8}>Bobo</Avatar>
            </div>
        )
        cy.viewport(300, 100);
        cy.compareSnapshot("avatar-rotate");
    })

    it("test avatar.group <maxCount>", () => {
        cy.mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2}
							  maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                <Avatar/>
                <Avatar>Bobo</Avatar>
                <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
            </Avatar.Group>
        );
        cy.viewport(300, 300);
        cy.get('.wui-avatar').eq(2).trigger('mouseover');
        cy.wait(400);
        cy.compareSnapshot("avatarGroup-maxCount");
    })

    it("test avatar <test prop:: onError>", () => {
        cy.mount(
            <>
                <Avatar src="1" onError={() => false}/>
                <Avatar src="1" onError={() => true}/>
            </>
        );
        cy.viewport(100, 100);
        cy.wait(400);
        cy.compareSnapshot("avatar-onError");
    })

    it("test avatar.group <test prop:: maxPopoverTrigger>", () => {
        cy.mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} maxPopoverTrigger="click"
							maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                <Avatar/>
                <Avatar>Bobo</Avatar>
                <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
            </Avatar.Group>
        );
        cy.viewport(300, 300);
        cy.get('.wui-avatar').eq(2).trigger('click');
        cy.wait(400);
        cy.compareSnapshot("avatarGroup-maxPopoverTrigger-click");
    })

    it("test avatar.group <test prop:: maxPopoverTrigger>", () => {
        cy.mount(
            <Avatar.Group maxPopoverPlacement="bottom" maxCount={2} maxPopoverTrigger="focus"
							maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                <Avatar/>
                <Avatar>Bobo</Avatar>
                <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
            </Avatar.Group>
        );
        cy.viewport(300, 300);
        cy.get('.wui-avatar').eq(2).trigger('focus');
        cy.wait(400);
        cy.compareSnapshot("avatarGroup-maxPopoverTrigger-focus");
    })
})