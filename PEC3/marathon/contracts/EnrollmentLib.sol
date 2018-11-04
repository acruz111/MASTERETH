pragma solidity ^0.4.24;

/** 
 * @title Enrollment Library
 * @dev Set of functions used to allow enrollments
 */
library EnrollmentLib {

    /**
     * @notice Test if the person who wants to enroll is eligible according to its age
     * @param _age The input address that you know if is zero.
     * @return True if the age is over 18 years old, False otherwise.
     */
       function isOver18 (uint _age)
        internal
        pure
        returns (bool)
    {
        return (_age >= 18);
    }
    
    /**
     * @notice Test if the person who wants to enroll is eligible according to the fee
     * @param _fee Indicates the fee the person who wants to enroll is going to pay
     * @param _feeToEnroll Indicates the fee to allow enrollments
     * @return True if the fees are equal, False otherwise.
     */
    function isValidFee (uint _fee, uint _feeToEnroll)
        internal
        pure
        returns (bool)
    {
        return (_fee == _feeToEnroll);
    }
}