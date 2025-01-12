import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import Form from "../../../../components/Form/Form";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../../../utils/apiRequest";
import errorMessages from "../../../../statusMessages/error";


function UserSubscription({ user, onClose, openModal, setSubmitStatus }) {
    const [subscribeOptions, setSubscribeOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(user.subscription?.options?.map((opt) => opt.id) || []);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        async function getOptions() {
            setIsFetching(true);
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-allSubscribeOptions`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                }
            });

            let data = response.data;
            if (response.status === 200) {
                setSubscribeOptions(data);
            } else {
                setSubmitStatus(data);
            }
            setIsFetching(false);
        }
        getOptions();
    }, [setSubmitStatus]);

    useEffect(() => {
        setHasChanges(checkForChanges(selectedOptions, user.subscription?.options?.map((opt) => opt.id) || []));
    }, [selectedOptions, user.subscription?.options]);

    const checkForChanges = (current, initial) => {
        if (current.length !== initial.length) return true;
        return current.some((option) => !initial.includes(option)) || initial.some((option) => !current.includes(option));
    };

    const saveSubscriptionChanges = async () => {
        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/update-selectedSubscriber/${user.subscription.id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedOptions),
            });

            setSubmitStatus(response.data);
            if (response.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        }
    }

    function handleToggle(optionId) {
        setSelectedOptions((prev) => {
            if (prev.includes(optionId)) {
                return prev.filter((id) => id !== optionId);
            } else {
                return [...prev, optionId]
            }
        })
    }

    return (
        <div className="col-12 col-xl-4">
            <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                <CardHeader title='Abunəlik məlumatları'>
                    {user.subscription && <Button disabled={!hasChanges} asButton={true} classList='border-0 bg-transparent w-auto btn bg-gradient-primary p-2' onClick={saveSubscriptionChanges}>Yadda saxla</Button>}
                </CardHeader>
                <CardBody classList="p-3">
                    {!user.subscription ? (
                        <Button classList="border-0 bg-transparent w-100 h-100" asButton={true} onClick={openModal('Abunəliyi aktiv et', 'md', <Form config={new ConfigGenerator().generateUserSubscription('add', user.id)} initialData={user} onClose={onClose} />)} style={{ fontSize: '16px' }}>
                            <FontAwesomeIcon icon={faLock} fontSize="28px" />
                            <p>Abunəlik aktiv deyil. Aktifləşdirmək üçün təsdiqləyin!</p>
                        </Button>
                    ) : isFetching ? (
                        <p>Məlumatlar yüklənir!</p>
                    ) : subscribeOptions.length > 0 ? (
                        subscribeOptions.map((subscribeOption) => (
                            <div key={subscribeOption.id}>
                                <h6 className="text-uppercase text-body text-xs font-weight-bolder">
                                    {subscribeOption.group}
                                </h6>
                                <ul className="list-group">
                                    {subscribeOption?.options.map((option) => (
                                        <li className="list-group-item border-0 px-0 pb-0" key={option.id}>
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    value={option.id || ''}
                                                    type="checkbox"
                                                    id={option.label}
                                                    checked={selectedOptions.includes(option.id)}
                                                    onChange={() => handleToggle(option.id)}
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor={option.label}
                                                >
                                                    {option.description}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Məlumat yoxdur!</p>
                    )}
                </CardBody>
            </UserProfileCard>
        </div>
    )
}

export default UserSubscription;