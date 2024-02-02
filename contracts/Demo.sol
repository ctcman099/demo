pragma solidity =0.5.12;

contract Demo {
    bytes32 public constant CALLBACK_SUCCESS_VAT_DAI = keccak256("VatDaiFlashBorrower.onVatDaiFlashLoan");

    constructor() public {
    }

    function onVatDaiFlashLoan(
        address initiator,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32) {
        return CALLBACK_SUCCESS_VAT_DAI;
    }

}